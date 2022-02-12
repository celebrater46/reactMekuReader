import React, {useEffect, useState} from "react";
import {server} from "../static/init";

const Ajax = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const convertItems = (result) => {
        let array = [];
        console.log("result: ");
        console.log(result);
        for(let i = 0; i < result.length; i++) {
            array.push(
                <p key={i}>
                    { result[i] }
                </p>
            );
        }
        return array;
    }

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch(server +"index.php")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(convertItems(result));
                    console.log("convertItems(result):");
                    console.log(convertItems(result));
                },

                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.

                // If "Failed to Fetch
                // Maybe the cause is CORS that your browser blocks AJAX with different server
                // Open your Chrome as developing mode
                // Refer: https://webbibouroku.com/Blog/Article/cors-browser-setting
                // The shortcut's target: "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:\Users\Enin\Local\Google\Chrome\User Data"
                // The shortcut's start in: "C:\Program Files\Google\Chrome\Application"
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        // console.log("items:");
        // console.log(items);
        return (
            <div>
                { items }
            </div>
        );
    }
}

export default Ajax;