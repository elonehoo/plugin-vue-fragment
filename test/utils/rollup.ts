import path from 'path';
import { rollup, RollupOptions } from 'rollup';
import alias from '@rollup/plugin-alias';
import vue from 'rollup-plugin-vue';

const vueFragInstall = path.resolve(__dirname, '../../dist/install.js');

const defaultConfig = (input: string) => ({
	input,
	plugins: [
		alias({
			entries: {
				'@elonehoo/plugin-vue-fragment/install': vueFragInstall,
			},
		}),
		vue(),
	],
});

type Config = RollupOptions & ReturnType<typeof defaultConfig>;

export async function build(
	input: string,
	configure?: (config: Config) => void,
) {
	const config: Config = defaultConfig(input);

	if (typeof configure === 'function') {
		configure(config);
	}

	const bundle = await rollup(config);
	const { output } = await bundle.generate({
		format: 'cjs',
		exports: 'default',
	});
	return output[0].code;
}
