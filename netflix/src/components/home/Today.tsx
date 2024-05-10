'use client';
import { useEffect, useState } from 'react';
import axios from '@/api/axios';
import request from '@/api/request';
import Image from 'next/image';
import TopNImg from '@/public/icon/topN.svg';
import PlusImg from '@/public/icon/plus.svg';
import PlayBtn from '@/components/common/PlayBtn';
import InfoImg from '@/public/icon/info.svg';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

export default function Today() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null); // 랜덤 영화 상태 추가
  
  useEffect(() => {
    // 영화 정보를 불러오는 함수
    async function fetchMovies() {
      try {
        const requests = await axios.get(request.fetchTopRated);
        setMovies(requests.data.results);
        const randomIndex = Math.floor(Math.random() * requests.data.results.length); // 랜덤 인덱스 생성
        setRandomMovie(requests.data.results[randomIndex]); // 랜덤 영화 선택
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div>
      <div className="w-full h-[415px] bg-gradient-to-b from-black via-black to-black">
        {randomMovie && ( // 랜덤 영화가 있으면 이미지 출력
          <img
            src={`https://image.tmdb.org/t/p/original${randomMovie.poster_path}`}
            alt={randomMovie.title}
            className="w-full h-full object-cover" // 이미지 비율 유지 및 컨테이너 채우기
          />
        )}
      </div>
      <section className="flex flex-row justify-center gap-[5px]">
        <TopNImg />
        <div className="fonts-today">Top 2 in Nigeria Today</div>
      </section>
      <section className="flex justify-between w-full h-[45px] mt-[11px] pl-[54px] pr-[62px]">
        <div className="flex flex-col items-center">
          <PlusImg />
          <div className="fonts-mainicon">My List</div>
        </div>
        <PlayBtn width={110.62}></PlayBtn>
        <div className="flex flex-col items-center">
          <InfoImg />
          <div className="fonts-mainicon">Info</div>
        </div>
      </section>
    </div>
  )
}