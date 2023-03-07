import useAuth from "@/hooks/useAuth";
import React from "react";

function BasicTitle({ code }){
    const accessToken = useAuth(code);

    //console.log('accessToken: ',accessToken);

    return (
        <div>
            <h1>{code}</h1>
            <h1>poopy butthole</h1>

        </div>
    )
}

export default BasicTitle