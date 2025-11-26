import { useTheme } from './Theme';

function Repositories () {
    const { theme } = useTheme();
    return (
        <div>
            <h1 class="display-3">Repositories</h1>
            <p>Here I'm showcasing a few of my repositories, mostly projects were developed during my freeCodeCamp journey.<br/>Feel free to check anyone!</p>
            <div id="repositories" class="row">
                <div id="repositories" class="col-md-6 text-md-start text-center">
                    <a target="_blank" href="https://github.com/dbguevaral/dbguevaral.github.io"><img class="mb-3 img-fluid repo" src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=dbguevaral.github.io&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img></a>
                    <a target="_blank" href="https://github.com/dbguevaral/boilerplate-project-american-british-english-translator"><img class="mb-3 img-fluid repo" src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=boilerplate-project-american-british-english-translator&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img></a>
                    <a target="_blank" href="https://github.com/dbguevaral/boilerplate-project-sudoku-solver"><img class="mb-3 img-fluid repo" src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=boilerplate-project-sudoku-solver&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img> </a>
                    <a target="_blank" href="https://github.com/dbguevaral/boilerplate-project-library"><img class="mb-3 img-fluid repo"src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=boilerplate-project-library&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img> </a>
                    <a target="_blank" href="https://github.com/dbguevaral/boilerplate-project-issuetracker"><img class="mb-3 img-fluid repo"src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=boilerplate-project-issuetracker&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img></a>
                    <a target="_blank" href="https://github.com/dbguevaral/boilerplate-project-metricimpconverter"><img class="mb-3 img-fluid repo"src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=boilerplate-project-metricimpconverter&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img> </a>
                    <a target="_blank" href="https://github.com/dbguevaral/boilerplate-advancednode"><img class="mb-3 img-fluid repo"src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=boilerplate-advancednode&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img> </a>
                    <a target="_blank" href="https://github.com/dbguevaral/boilerplate-mochachai"><img class="mb-3 img-fluid repo"src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=boilerplate-mochachai&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img></a>
                </div>
                <div class="col-md-6 text-md-end text-center">    
                    <a target="_blank" href="https://github.com/dbguevaral/boilerplate-project-filemetadata"><img class="mb-3 img-fluid repo" src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=boilerplate-project-filemetadata&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img></a>
                    <a target="_blank" href="https://github.com/dbguevaral/boilerplate-project-exercisetracker"><img class="mb-3 img-fluid repo" src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=boilerplate-project-exercisetracker&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img></a>
                    <a target="_blank" href="https://github.com/dbguevaral/boilerplate-project-urlshortener"><img class="mb-3 img-fluid repo" src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=boilerplate-project-urlshortener&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img></a>
                    <a target="_blank" href="https://github.com/dbguevaral/boilerplate-project-headerparser"><img class="mb-3 img-fluid repo" src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=boilerplate-project-headerparser&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img></a>
                    <a target="_blank" href="https://github.com/dbguevaral/boilerplate-project-timestamp"><img class="mb-3 img-fluid repo" src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=boilerplate-project-timestamp&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img> </a>
                    <a target="_blank" href="https://github.com/dbguevaral/boilerplate-express"><img class="mb-3 img-fluid repo" src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=boilerplate-express&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img></a>
                    <a target="_blank" href="https://github.com/dbguevaral/boilerplate-npm"><img class="mb-3 img-fluid repo" src={`https://github-readme-stats-five-gamma-66.vercel.app/api/pin/?username=dbguevaral&repo=boilerplate-npm&theme=${theme==='dark' ? 'dark' : 'default'}`} alt="Repo Card"></img></a>        
                </div>    
            </div>                
        </div>
    )
}

export default Repositories;