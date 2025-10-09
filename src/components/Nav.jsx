function Nav ({ setSection }) {
    return (
        <div>
            <nav class="navbar fixed-top container justify-content-end gap-3">
                <div class="navbar-brand" onClick={() => setSection('about')}>About</div>         
                <div class="navbar-brand" onClick={() => setSection('projects')}>Projects</div>
                <div class="navbar-brand" onClick={() => setSection('resume')}>Resume</div>                 
            </nav>
        </div>
    )
}

export default Nav;