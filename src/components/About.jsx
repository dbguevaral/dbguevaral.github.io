function About() {
    return (
        <div id="about">
            <h1 class="display-5 fw-semibold">Diego Guevara</h1>
            <p class="fst-italic">science & technology</p>
            <div class="row">
                <div class="col-sm mt-2 order-sm-1 order-2">
                    <p>I'm a former electromechanical engineer with a deep passion for both renewable energy and programming. I'm currently transitioning into the tech industry, eager to apply my skills as a full-stack developer.</p>
                    <p>I've trained through the freeCodeCamp bootcamp, where I gained hands-on experience in both front-end and back-end development. I'm incredibly grateful to the freeCodeCamp team — their lessons empowered me to build this very website.</p>
                    <p>Right now, I'm actively seeking my first opportunity in tech, where I can grow professionally, contribute to meaningful projects, and learn from experienced teammates. My long-term goal? To reach a point where I can combine my engineering background with my coding expertise to support innovative green solutions within a forward-thinking IT team.</p> 
                </div>
                <div class="col-sm-4 col mt-3 order-sm-2 order-1 p-0">
                    <img class="img-fluid rounded" src="https://i.imgur.com/R1wxJ0I.jpeg" alt="profile-picture"></img>  
                        <div class="fw-light text-center">Lima, Perú <span class="d-md-inline d-none">-</span> <a class="d-md-inline d-block" target="_blank" href="mailto:dbguevaral@gmail.com?subject=Hello, Diego">dbguevaral@gmail.com</a></div>
                </div>
            </div>
            <div class="container d-flex align-items-center justify-content-center mt-4 p-2 gap-3">
                <a target="_blank" href="https://www.linkedin.com/in/dbguevaral/"><i class="bi bi-linkedin"></i></a>
                <a target="_blank" href="https://github.com/dbguevaral"><i class="bi bi-github"></i></a>
                <a target="_blank" href="mailto:dbguevaral@gmail.com?subject=Hello, Diego"><i class="bi bi-envelope-fill"></i></a>
            </div>    
        </div>
    );
}

export default About;