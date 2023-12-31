// https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28#rate-limiting
// https://api.github.com/users/egeres/starred?per_page=100&page=0

import axios from "axios";

export const extract_user_data = async (user: String) => {
    console.log("userrr =", user)

    let max_scrapping_pages = 999;

    const get_repos_API = (user: String, page: number = 0) => axios
        .get(`https://api.github.com/users/${user}/starred?per_page=100&page=${page + 1}`)
        .then(res => res.data)
        .then(res => res.map(x => {
            return {
                id: x.id,
                name: x.name,
                full_name: x.full_name,
                html_url: x.html_url,
                stargazers_count: x.stargazers_count,
                language: x.language,
                created_at: x.created_at,
                forks_count: x.forks_count,
                description: x.description,
                topics: null,
            }
        }
        ))


    let to_return: any[] = [];
    for (let page = 0; page < max_scrapping_pages; page++) {

        let extracted = await get_repos_API(user, page)
            .then(x => { return x })
            .catch(e => {
                // console.log("Error =", e)
                if (e.response.status === 403) { console.log("Error 403"); return "error 403"; }
                if (e.response.status === 404) { console.log("Error 404"); return "error 404"; }
            });
        // console.log("extracted =", extracted)
        // if (extracted === null) { return ""; break; }
        if (extracted === null) { break; }
        to_return = to_return.concat(extracted);
        break
    }
    console.log("to_return.length =", to_return.length)
    return to_return;

}

// extract_user_data("user")