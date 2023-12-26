import Graph_1 from '../Graph_1.svelte';

export default {
    title: 'Graph_1',
    component: Graph_1,
};

export const Primary = (args: any) => ({
    Component: Graph_1,
    props: args,
});
Primary.args = {
    width: 500,
    height: 500,
};
