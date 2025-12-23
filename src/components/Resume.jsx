import DownloadResume from "./Download";

function Resume() {
    return (
        <div id="resume">
            <div class="row">
                <div class="col-2 d-sm-block d-none">
                    <nav id="left-nav" class="navbar navbar-brand flex-column align-items-start sticky-top gap-2 ">
                        <a class="nav-link fw-normal" href="#basics">Basics</a>
                        <a class="nav-link fw-normal" href="#work">Work</a>
                        <a class="nav-link fw-normal" href="#education">Education</a>
                        <a class="nav-link fw-normal" href="#certificates">Certificates</a>
                        <a class="nav-link fw-normal" href="#stack">Stack</a>
                        <a class="nav-link fw-normal" aria-current="page" href="#engineering">Engineering</a>
                        <a class="nav-link fw-normal" href="#languages">Languages</a>
                    </nav>
                </div>
                
                <div class="col">  
                    <div id="section-container" data-bs-spy="scroll" data-bs-target="#left-nav" data-bs-smooth-scroll="true" tabindex="0">
                        <div class="d-flex justify-content-between">
                            <h1 class="display-3">Resume</h1>
                            <div><DownloadResume/></div>
                        </div>
                        <section id="basics" class="custom-container">
                            <h2 class="m-0 mb-2">Basics</h2>
                            <div class="row g-0">
                                <div class="col-md-2 basics fw-semibold">Name</div>
                                <div class="col pb-2">Diego Guevara</div>
                            </div>
                            <div class="row g-0">
                                <div class="col-md-2 basics fw-semibold">Label</div>
                                <div class="col pb-2">Engineer Developer</div>
                            </div>
                            <div class="row g-0">
                                <div class="col-md-2 basics fw-semibold">Email</div>
                                <div class="col pb-2"><a href="mailto:dbguevaral@gmail.com?subject=Hello, Diego">dbguevaral@gmail.com</a></div>
                            </div>
                            <div class="row g-0">
                                <div class="col-md-2 basics fw-semibold">Phone</div>
                                <div class="col pb-2"><a href="tel:+51915936711">+51 915936711</a></div>
                            </div>
                            <div class="row g-0">
                                <div class="col-md-2 basics fw-semibold">Summary</div>
                                <p class="col pb-2">Electromechanical engineer specializing in renewable energy systems, now bridging hardware and software through full-stack development. Experienced in JavaScript, React & Node.js.</p>
                            </div>  
                        </section>

                        <section id="work" class="custom-container">
                            <h2 class="m-0 mb-2">Work</h2>
                            <div class="row g-0">
                                <div class="col-md-3 date"><span class="rounded-1 fw-semibold">11.2023 - 01.2024</span></div>
                                <div class="col-md">
                                    <h4>Drafter in Metallurgy Area</h4>
                                    <h6>Autoprocesos S.A.C.</h6>
                                    <p>Development of flow diagrams for the expansion to 2100
                tons per day of the custom-colquisiri mining unit at the basic
                engineering level during the last quarter of 2023 and the
                beginning of this year.</p>
                                </div>          
                            </div>
                            <div class="row">
                                <div class="col-md-3 date"><span class="rounded-1 fw-semibold">03.2019 - 07.2022</span></div>
                                <div class="col-md">
                                    <h4>Drafter in Electrical and Metallurgy Area</h4>
                                    <h5>GEMIN Associates</h5>
                                    <p> Development of single-line diagrams, power and control
                systems, grounding, and lighting in the electrical discipline.
                In metallurgy, flow diagrams were created for all areas of
                the metallurgical process. In both disciplines, participation
                was at the basic and detailed engineering levels for
                concentrator plant projects such as Sumaq Rumi, Antapite,
                Morococha, and Huarón.</p>
                                </div>          
                            </div>
                            <div class="row">
                                <div class="col-md-3 date"><span class="rounded-1 fw-semibold">09.2018 - 02.2019</span></div>
                                <div class="col-md">
                                    <h4>Drafter in Instrumentation Area</h4>
                                    <h5>Environmental Science Engineering & Gis S.R.L 
                Escegis</h5>
                                    <p>Drawing of P&ID diagrams, as well as architectural and
                control plans and instrument layout at the basic
                engineering level for the expansion of El Porvenir mining
                unit.</p>
                                </div>          
                            </div>           
                        </section>

                        <section id="education" class="custom-container">
                            <h2 class="m-0 mb-2">Education</h2>
                            <div class="row">
                                <div class="col-md-3 date"><span class="rounded-1 fw-semibold">04.2023 - Present</span></div>
                                <div class="col-md">
                                    <h4>Master's in Renewable Energies</h4>
                                    <p><span class="fw-semibold">Universidad Europea de Madrid</span><br/>Coursework Completed (Thesis Pending)</p>
                                </div>          
                            </div>
                            <div class="row">
                                <div class="col-md-3 date"><span class="rounded-1 fw-semibold">03.2022 - 02.2023</span></div>
                                <div class="col-md">
                                    <h4><a target="_blank" href="https://i.imgur.com/5O3VMqn.jpeg">Professional Title of<br/>Electromechanical Engineer</a></h4>
                                    <p><span class="fw-semibold">Universidad Tecnológica del Perú</span></p>
                                </div>          
                            </div>
                            <div class="row">
                                <div class="col-md-3 date"><span class="rounded-1 fw-semibold">01.2017 - 02.2022</span></div>
                                <div class="col-md">
                                    <h4><a target="_blank" href="https://i.imgur.com/Q8HiFsY.jpeg">Bachelor's Degree of<br/>Electromechanical Engineering</a></h4>
                                    <p class="fw-semibold">Universidad Tecnológica del Perú</p>
                                </div>          
                            </div>
                            <div class="row">
                                <div class="col-md-3 date"><span class="rounded-1 fw-semibold">01.2015 - 12.2016</span></div>
                                <div class="col-md">
                                    <h4>Bachelor's Degree of<br/>Electronic Engineering</h4>
                                    <p><span class="fw-semibold">Universidad Nacional del Callao</span><br/>Completed to 4th Semester</p>
                                </div>          
                            </div>
                        </section>

                        <section id="certificates" class="custom-container">
                            <h2 class="m-0 mb-2">Certificates</h2>
                            <div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <h5><a target="_blank" href="https://certificates.simplicdn.net/share/9625205_9801665_1766435625267.pdf">TypeScript Basics</a></h5>
                                        <h6>simplilearn | SkillUp</h6><p>22.12.2025</p>

                                        <h5><a target="_blank" href="https://www.freecodecamp.org/certification/dbguevaral/quality-assurance-v7">Quality Assurance</a></h5>
                                        <h6>freeCodeCamp</h6><p>29.09.2025</p>
                                    
                                        <h5><a target="_blank" href="https://www.freecodecamp.org/certification/dbguevaral/back-end-development-and-apis">Back End Development and APIs</a></h5>
                                        <h6>freeCodeCamp</h6><p>19.08.2025</p>
                                    
                                        <h5><a target="_blank" href="https://www.freecodecamp.org/certification/dbguevaral/data-visualization">Data Visualization</a></h5>
                                        <h6>freeCodeCamp</h6><p>30.07.2025</p>
                                    
                                          
                                    </div>
                                    <div class="col-md-6">
                                        <h5><a target="_blank" href="https://www.freecodecamp.org/certification/dbguevaral/front-end-development-libraries">Front End Development Libraries</a></h5>
                                        <h6>freeCodeCamp</h6><p>23.06.2025</p>

                                        <h5><a target="_blank" href="https://www.freecodecamp.org/certification/dbguevaral/javascript-algorithms-and-data-structures-v8">JavaScript Algorithms and Data Structures</a></h5>
                                        <h6>freeCodeCamp</h6><p>05.05.2025</p>

                                        <h5><a target="_blank" href="https://www.freecodecamp.org/certification/dbguevaral/responsive-web-design">Responsive Web Design</a></h5>
                                        <h6>freeCodeCamp</h6><p>10.04.2025</p>

                                        <h5><a target="_blank" href="https://i.imgur.com/4Zz5YRF.jpeg">Power BI Course</a></h5>
                                        <h6>Idat</h6><p>05.12.2022</p>
                                    </div>
                                </div> 
                            </div>
                        </section>

                        <section id="stack" class="custom-container">
                            <h2 class="m-0 mb-2">Stack</h2>
                            <div class="row">
                                <div class="col">
                                    <h5>Languages</h5>
                                    <ul>
                                        <li>HTML5</li>
                                        <li>CSS3</li>
                                        <li>JavaScript</li>
                                        <li>TypeScript</li>
                                    </ul>
                                    <h5>Tools & Platforms</h5>
                                    <ul>
                                        <li>Git & GitHub</li>
                                        <li>VS Code</li>
                                        <li>npm</li>
                                        <li>NASA Power API</li>
                                        <li>Mongo DB</li>
                                        <li>Google Cloud APIs & Services</li>
                                    </ul>
                                </div>
                                <div class="col">    
                                    <h5>Frameworks & Libraries</h5>
                                    <ul>
                                        <li>jQuery</li>
                                        <li>Express</li>
                                        <li>Sass</li>
                                        <li>React</li>
                                        <li>Redux</li>
                                        <li>React-Redux</li>
                                        <li>D3</li>
                                        <li>Node.js</li>
                                        <li>Express</li> 
                                        <li>Mongoose</li>
                                        <li>Chai</li> 
                                    </ul>       
                                </div>
                            </div>
                        </section>

                        <section id="engineering" class="custom-container">
                            <h2 class="m-0 mb-2">Engineering</h2>
                            <div class="row">
                                <div class="col">
                                    <h5>Areas of Expertise</h5>
                                    <div>
                                        <ul>
                                            <li>Automation and Control</li>
                                            <li>Electricity Grid</li>
                                            <li>Metallurgical Process</li>
                                            <li>Power Station</li>
                                            <li>Renewable Energies</li>
                                        </ul>
                                    </div>          
                                </div>
                                <div class="col">
                                    <h5>Engineering Tools</h5>
                                    <div>
                                        <ul>
                                            <li>AutoCAD</li>
                                            <li>AutoCAD Plant 3D</li>
                                            <li>Inventor</li>
                                            <li>PVSyst</li>
                                            <li>WAsP</li>
                                            <li>Windographer</li>
                                        </ul>
                                    </div>          
                                </div>
                            </div>
                        </section>

                        <section id="languages" class="custom-container">
                            <h2 class="m-0 mb-2">Languages</h2>
                            <div class="row">
                                <div class="col">
                                    <h6>Spanish</h6>
                                    <p>Native</p>
                                </div>
                                <div class="col">
                                    <h6>English</h6>
                                    <p>Fluent</p>
                                </div>
                            </div>
                        </section>
                    </div>          
                </div>
            </div>
        </div>
    )
}

export default Resume;