const API_URL ="https://api.github.com/users/"

const form = document.getElementById("form")
const search = document.getElementById("search")
const main = document.getElementById("main")

// getUser(ozantekin)

//*asenkron işlem await ile olacak
async function getUser(username){
    try{
        const {data} = await axios(API_URL + username)
        createUserCard(data)
        getRepos(username)
    }catch(err){
createErrorCard("Aradığınız kullanıcı bulunamadıs")
    }
}


form.addEventListener("submit",(e)=> {
    e.preventDefault();

    const user = search.value

    if(user){
        getUser(user)

            search.value = ''
        
    }
})

function createUserCard(user){
    
    const userName = user.name || user.login
    const userBio = user.bio ? `<p>${user.bio}</p>` : "" //*boşluk döndürme eğer biomuz yoksa. yoksa null verir
    
    const cardHTML = `
    <div class="card">
        <img class="user-image"
         src=${user.avatar_url} alt=${user.name}>


        <div class="user-info">
            <div class="user-name">
                <h2>${userName}</h2>
                <small>@${user.login}</small>
            </div>
        </div>

        <p>
        ${userBio}
        </p>
        
        <ul>
            <li>
                <i class="fa-solid fa-user-group"></i> ${user.followers} 
                <strong>Followers</strong>
            </li>
            <li> ${user.following} <strong>Following</strong></li>
            <li>
                <i class="fa-solid fa-bookmark"> </i> ${user.public_repos}
                <strong>Repository</strong>
            </li>
        </ul>

        <div class="repos" id="repos">
           
        </div>
    </div>
    `

    main.innerHTML = cardHTML
}

function createErrorCard(msg) {
    const cardErrorHTML = `
    <div class="card>
        <h2>${msg}</h2>
    </div>

    `

    main.innerHTML = cardErrorHTML
  }

  async function getRepos(username){
    try {
        const {data} = await axios(API_URL + username + "/repos")
        addReposToCard(data)
    } catch (err) {
        createErrorCard("Üzgünüz sonuca ulaşamadık")
    }
  }

  function addReposToCard(repos){
    const reposEl = document.getElementById("repos")

    //*0 ile 3arasını ver
    repos.slice(0,3).forEach((repo) => {
        //*a etiketi yarat
        const reposLink = document.createElement("a")
        reposLink.href=repo.html_url //*htmk_url ekledik
        reposLink.target = "_blank" //*farklı sekmede aç
        reposLink.innerHTML = `<i class"fa-solid fa-book-bookmark"></i>${repo.name}`

        // reposEl.appendChild("reposLink")
    })
  }