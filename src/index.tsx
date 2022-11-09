import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/App/App';

ReactDOM.render(<App />, document.getElementById('root'));


//index.tsx is the entry point to our react app where we mount the app component onto the root dom node and app.
//tsx contains our app component which is the root component unlike a regular create react app project through the file extention is dottsx
//react typesc codebase components are defined in a dot tsx file  & not a dot js or dot jsx file