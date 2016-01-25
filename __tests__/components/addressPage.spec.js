
jest.dontMock('../../src/components/AddressPage');

var React = require('react-native');
var { Text, View } = React;
var AddressPage = require('../../src/components/AddressPage').default;

const shallowHelpers = require('react-shallow-renderer-helpers');
const shallowRenderer = shallowHelpers.createRenderer();



describe('Address Page', function() {
    it('should render text component', () => {
        shallowRenderer.render(() => <AddressPage location = {{
            geometry: {
                location: {
                    lat: 10,
                    lng: 20
                }
            }
        }}

        />);
        let output = shallowRenderer.getRenderOutput();
        expect(output.props.children.type).toBe(Text);
    });
});
