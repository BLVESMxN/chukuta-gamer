import axios from 'axios';

export class RequestHandler{


    constructor(){
        this.handler = axios.create({
            baseURL:"http://localhost:8080",
        });
    }

    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    async checkConnection(){
        var res = await this.handler.get("/health_check");    
        return res;
    }

    async getRequest(url, par={}){
        let csrf = this.getCookie('csrftoken');
        let session = this.getCookie('sessionid');
        var res =  await this.handler.get(
            url, 
            {
                params : par,
                headers: {
                    'X-CSRFToken': csrf,
                },
                withCredentials: true,
            })
        return res;
    }

    async postRequest(url, data={}, par={}){

        
    let csrf = this.getCookie('csrftoken');
    let session = this.getCookie('sessionid');
    var res = await this.handler.post(
        url, 
        data,
        {
            params : par,
            headers: {
                'X-CSRFToken': csrf,
            },
            withCredentials: true,
        })
    }
}

//export{RequestHandler};