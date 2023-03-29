import axios from "axios";

export default {
    getData(id) {
        let data = null;
        axios.get(
            "http://localhost:8088/api/player/" + id
        ).then(res => {
            data =  res.data
        })
        return data
    }
}