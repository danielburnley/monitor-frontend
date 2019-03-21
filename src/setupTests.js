import { configure } from 'enzyme';
import nock from "nock";
import Adapter from 'enzyme-adapter-react-16';

function catchNock(reason, p) {
  console.error(
    `Rejected promise ${JSON.stringify(p, null, "\t")}\n`+
    `with error: ${reason.name}\n${reason.message}\n`+
    `Unresolved nocks: \n${nock.pendingMocks().join("\n")}`
  );
}

process.on('unhandledRejection', catchNock);

configure({ adapter: new Adapter() });
