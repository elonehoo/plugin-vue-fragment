import { vueFrag } from '../dist';
import { build } from './utils/rollup';
import { multiRootComponentPath } from './fixtures';

test('works with vue rollup plugin', async () => {
	const output = await build(multiRootComponentPath, (config) => {
		config.plugins.unshift(vueFrag());
	});

	const Component = eval(output);
	expect(Component).toMatchObject({ _compiled: true });
});
