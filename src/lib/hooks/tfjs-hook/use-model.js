import { useState } from "react";
import useAsyncEffect from "use-async-effect";

export default (modelJson) => {
    const [model, setModel] = useState(null);
    useAsyncEffect(async isMounted => {
        const model = await tf.loadLayersModel(modelJson);
        if (!isMounted()) return;
        setModel(model);
    }, []);
    return model;
};
