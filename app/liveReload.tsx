import { LiveReload } from "remix";


export default function Reload() {

    return process.env.NODE_ENV === 'development' ? <LiveReload /> : null;

}