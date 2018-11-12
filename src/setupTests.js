import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

process.on('unhandledRejection', function(reason, p) {
    console.error(
      `Rejected promise ${JSON.stringify(p, null, "\t")}\nwith error: ${reason.name}\n${reason.message}`
    )
});

configure({ adapter: new Adapter() });
