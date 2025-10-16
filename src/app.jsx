import {useState} from 'react';
import Nav from './components/Nav';
import About from './components/About';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Repositories from './components/Repositories';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
   const [section, setSection] = useState('about');
   
   return (
    <div>
        <Nav setSection={setSection}/>
        <div id="content" class="container-md">
            {section === 'about' && <About/>}
            {section === 'projects' && <Projects/>}
            {section === 'resume' && <Resume/>}
            {section === 'repositories' && <Repositories/>}
        </div>
    </div>
   )
}

export default App