const domain = "https://api.github.com/";
import base64 from 'react-native-base64';
import { AsyncStorage } from 'react-native';

export const _request = async (method, uri, payload) => {

    method = method.toUpperCase() || "GET";

    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    console.log(email)
    if (email == undefined || password == undefined) {
        return null
    }

    let token = base64.encode(email + ":" + password);
    console.log(token)

    let options = {
        // uri: domain + uri,
        method: method,
        qs: "GET" === method ? payload : null,
        headers: { Authorization: "Basic " + token },
        json: true,
        body: "GET" !== method ? payload : null
    };

    try {
        const response = await fetch(domain + uri, options);
        console.log(response)
        if(response.status != 200)
        {
            return {error: await response.json(), status: response.status}
        }
        return await response.json()
    } catch (err) {
        console.log(err)
        return { error: err.error, body: null }
    }
};
