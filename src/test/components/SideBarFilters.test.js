import renderer from 'react-test-renderer';
import SideBarFilters from "../../components/SideBarFilters.js";

test("test with null", () => { 
    let tree = renderer
    .create(<SideBarFilters text={null} filter={null}/>)
    .toJSON()
    expect(tree).toMatchSnapshot();
});

test("test with empty string", () => {
    let tree = renderer
    .create(<SideBarFilters text="" filter={null}/>)
    .toJSON()
    expect(tree).toMatchSnapshot();
});

test("test with something in the text", () => {
    let tree = renderer
    .create(<SideBarFilters text="abcde" filter={null}/>)
    .toJSON()
    expect(tree).toMatchSnapshot();
});

test("test filter props with empty array", () => {
    let tree = renderer
    .create(<SideBarFilters text="" filter={[]}/>)
    .toJSON()
    expect(tree).toMatchSnapshot();
});

test("test filter props with array", () => {
    let inspectArray = [
        {filterName: "Under 10$", filterFunction: () => {}},
        {filterName: "Between 11$ and 20$", filterFunction: () => {}},
        {filterName: "Between 21$ and 30$", filterFunction: () => {}},
        {filterName: "Between 31$ and 40$", filterFunction: () => {}},
        {filterName: "Over 40$", filterFunction: () => {}},
    ];
    let tree = renderer
    .create(<SideBarFilters text="" filter={inspectArray}/>)
    .toJSON()
    expect(tree).toMatchSnapshot();
});

