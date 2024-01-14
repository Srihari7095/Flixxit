import React, { useState, useEffect } from "react";
import Nav from "../../Components/Nav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchMystery } from "../../features/TvSlice";
import "../../Style/Content.css";
import Tvnav from "../../Components/Tvnav";
import { Watchlist } from "../../Components/request";
import { clickHandler } from "../../Components/Utils";
import { useNavigate } from "react-router-dom";
import {get, patch} from "../../Custom/useApi";

function MysteryTv() {
  const dispatch = useDispatch();
  const [watchlist, setWatchlist] = useState([]);
  const tv = useSelector((state) => state.tv.mystery);
  const loading = useSelector((state) => state.tv.loading);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchMystery());
    getwatchlist();
  }, [dispatch]);
  const getwatchlist = () => {
    const id = localStorage.getItem("userId");
    get(`${Watchlist.getWatchlist}/${id}`)
      .then((res) => {
        setWatchlist(res.data.contentResult);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleWatchlist = (contentid) => {
    const id = localStorage.getItem("userId");
    const queryParam = new URLSearchParams({ contentId: contentid });
   patch(`${Watchlist.addWatchlist}/${id}`, {}, { params: queryParam })
      .then((res) => {
        if (res.data.status === 200) {
          setWatchlist(res.data.contentResult);
        } else if (res.data.status === 409) {
          patch(`${Watchlist.deleteWatchlist}/${id}`, {}, {
              params: queryParam,
            })
            .then((res) => {
              setWatchlist(res.data.contentResult);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Nav />
      <Tvnav />
      <>
        {template(
          "mystery",
          tv.result,
          "tv",
          img_base_url,
          loading,
          watchlist,
          toggleWatchlist,
          clickHandler,
          navigate
        )}
      </>
    </div>
  );
}

export default MysteryTv;
