function Nav ({ setSection }) {
    return (
        <div>
            <nav id="top-nav" class="navbar fixed-top border-bottom">
                <div class="container-fluid justify-content-end fw-light d-sm-none d-flex">
                    <button class="navbar-toggler d-sm-none d-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#off-canvas-nav" aria-controls="offcanvasNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div id="off-canvas-nav" class="offcanvas offcanvas-end w-50" tabindex="-1" aria-labelledby="off-canvas-nav">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="off-canvas-nav-label">Menu</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <div class="navbar-brand hovering" onClick={() => setSection('about')}>About</div>         
                            <div class="navbar-brand hovering" onClick={() => setSection('projects')}>Projects</div>
                            <div class="navbar-brand hovering" onClick={() => setSection('resume')}>Resume</div> 
                            <div class="navbar-brand hovering" onClick={() => setSection('repositories')}>Repositories</div>
                        </div>
                    </div> 
                </div>
                <div class="container-fluid justify-content-end fw-light d-none d-sm-flex">
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