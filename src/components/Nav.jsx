function Nav ({ setSection }) {
    return (
        <div>
            <nav id="top-nav" class="navbar fixed-top border-bottom">
                <div class="container-fluid justify-content-end fw-light">
                    <div class="navbar-brand hovering" onClick={() => setSection('about')}>About</div>         
                    <div class="navbar-brand hovering" onClick={() => setSection('projects')}>Projects</div>
                    <div class="navbar-brand hovering" onClick={() => setSection('resume')}>Resume</div> 
                    <div class="navbar-brand hovering" onClick={() => setSection('repositories')}>Repositories</div>
                </div>             
            </nav>
        </div>
    )
}

export default Nav;