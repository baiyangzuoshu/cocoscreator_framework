import { _decorator, Component, Node } from 'cc';

export class HttpUtils  {
    private static SetResponsOpt(xhr: XMLHttpRequest, OnResponse) {
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4){
                // console.log("http res("+ xhr.responseText.length + "):" + xhr.responseText);
                if((xhr.status >= 200 && xhr.status < 300)) {
                    let dataRespones = null;
                    if(xhr.responseType === "text" || xhr.responseType === "json") {
                        dataRespones = xhr.responseText;
                    }
                    else {
                        dataRespones = xhr.response;
                    }
                    if(OnResponse !== null){
                        OnResponse(null, dataRespones);
                    }
                }
                else {
                    OnResponse(xhr.readyState + ":" + xhr.status, null);
                }
            }
        };

        xhr.onerror = function(err) {
            if(OnResponse) {
                OnResponse(err, null);
            }
        }

        xhr.ontimeout = function() {
            if(OnResponse) {
                OnResponse("Timeout", null);
            }
        }
    }

    public static Get(url: string, params: string, OnResponse: Function): void {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        var requestURL = url;
        if (params) {
            requestURL = requestURL + "?" + params;
        }
        xhr.open("GET",requestURL, true);
        
        HttpUtils.SetResponsOpt(xhr, OnResponse);
        
        xhr.send();

    }

    public static PostJson(url: string, params: string, jsonBody:string, OnResponse: Function) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 5000;

        var requestURL = url;
        if (params) {
            requestURL = requestURL + "?" + params;
        }

        
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.open("POST",requestURL, true);

        HttpUtils.SetResponsOpt(xhr, OnResponse);
        
        xhr.send(jsonBody);
        
    }

    public static PostFrom(url: string, params: string, body:object, OnResponse: Function) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 5000;

        var requestURL = url;
        if (params) {
            requestURL = requestURL + "?" + params;
        }

        xhr.open("POST",requestURL, true);

        HttpUtils.SetResponsOpt(xhr, OnResponse);
        
        var formData = new FormData();
        for(var key in body) {
            formData.append(key, body[key]);
        }
        xhr.send(formData);
        
    }

}


