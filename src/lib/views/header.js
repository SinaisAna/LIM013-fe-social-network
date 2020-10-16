export const headerTemplate = (user) => {
    const viewProfile = document.createElement('section');
    viewProfile.innerHTML = ` 
    <header>
    <nav>
    <div class="title-energy">
    <h4 class="title">Energía Verde💡</h4></div>
    <input type="checkbox" id="check-and-uncheck">
    <label for="check-and-uncheck">
    <i class="fas fa-bars" id="hamburger"></i>
    <i class="fas fa-times" id="cross"></i>
    </label>
    <ul>
    <li>
    <a id="btn-log-out">Salir</a>
    </li>
    </ul>
    </nav>
    </header>
    <section class="container-profile">
    <div><img src="../img/escritorios.png" class="init"</div>
    <img class="user-image" src="${user.photoUrl}">
    <div><p id="edit-user-name">${user.name}</p></div>
    <h3>Email</h3>
     <p>${user.email}</p>
     <button class="editPost hidden" id="editPost"><i class="far fa-edit"></i></button>
     <button class="editPost hidden" id="exitPost"><i class="far fa-save" aria-hidden="true"></i></button>
     
    </section>
    </section>
    <div id="post-container" class="post general-position">
    <div>
    <textarea id="box-post"class="textarea" placeholder="¿Qué quieres compartir?" maxlength="100" rows="8" cols="77">
    </textarea>
    </div>
    <span class="deletImg hidden" id="exit">❎</span>
    <div id="imgURL" class="imgURL"></div>
    <label id="add-new-photo">
    <i id="btn-photo" class="far fa-images"></i>
    <input type="file" id="photoPost" class="file" accept="image/*">
    </label>
    <select class="space" id="mode-post">
    <option value="" disabled selected>Modo</option>
    <option id="private" value="private">Privado</option>
    <option id="public" value="public">Publico</option>
    </select>
    <label class"plane"><i id="btn-share" class="far fa-paper-plane"></i></label>
    </div>
    <div id="message-post"> 
    </div>
    `;
    return viewProfile;
};
