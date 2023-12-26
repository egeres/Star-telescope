import Graph_0 from '../Graph_0.svelte';

export default {
    title: 'Graph_0',
    component: Graph_0,
};

export const Primary = (args: any) => ({
    Component: Graph_0,
    props: args,
});
Primary.args = {
    width: 500,
    height: 500,
};
