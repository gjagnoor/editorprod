import axios from "axios";
// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
    return new Promise((resolve) =>
        setTimeout(() => resolve({ data: amount }), 500)
    );
}

(async function () {
    return await axios
        .get("/api/me")
        .then((result) => {
            console.log("result.data: ", result.data);
            return result.data;
        })
        .catch((err) => console.error(err));
})();
