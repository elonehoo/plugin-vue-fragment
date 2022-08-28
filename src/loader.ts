import { LoaderContext } from 'webpack';
import transformer from './transformer';

function VueFragmentLoader(this: LoaderContext<never>, source: string) {
	const { code, map } = transformer(source, this.resourcePath);
	this.callback(null, code, map);
}

export default VueFragmentLoader;
