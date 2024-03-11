import React, { useContext, useEffect, useState } from "react";

export const API_URL = `https://www.omdbapi.com/?apikey=e7962e4`;

const AppContext = React.createContext();
const AppProvider = ( {children} ) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: false, msg: "" });
    const [query, setQuery] = useState("titanic");

    const getMovies = async (url) =>{
        setIsLoading(true)
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if(data.Response === "True"){
                setIsLoading(false)
                setMovie(data.Search)
                setIsError({
                    show : false,
                    msg: "",
                })
            } else {
                setIsError({
                    show : true,
                    msg: data.Error,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        let timerOut = setTimeout(() =>{
            getMovies(`${API_URL}&s=${query}`);
        }, 800)

        return () => clearTimeout(timerOut)
    }, [query])

    return <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery}}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = () =>{
    return useContext(AppContext)
}

export {AppProvider, AppContext, useGlobalContext} ;
 