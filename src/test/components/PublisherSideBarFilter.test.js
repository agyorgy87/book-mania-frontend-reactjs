import renderer from 'react-test-renderer';
import PublisherSideBarFilter from '../../components/PublisherSideBarFilter';

test("test with empty list", () => {
    let tree = renderer
    .create(<PublisherSideBarFilter options={[]} filter={() => {}}/>)
    .toJSON()
    expect(tree).toMatchSnapshot();
});

test("test with options list", () => {
    let inspectArray = [
        {publisher_name: "dog"}
    ]
    let tree = renderer
    .create(<PublisherSideBarFilter options={inspectArray} filter={() => {}}/>)
    .toJSON()
    expect(tree).toMatchSnapshot();
});

test("test with undefined", () => {
    let tree = renderer
    .create(<PublisherSideBarFilter options={undefined} filter={() => {}}/>)
    .toJSON()
    expect(tree).toMatchSnapshot();
});



