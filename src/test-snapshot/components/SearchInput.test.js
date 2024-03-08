import renderer from 'react-test-renderer';
import SearchInput from '../../components/SearchInput';

test("test with function", () => {
    let tree = renderer
    .create(<SearchInput onChange={() => {}}/>)
    .toJSON()
    expect(tree).toMatchSnapshot();
});