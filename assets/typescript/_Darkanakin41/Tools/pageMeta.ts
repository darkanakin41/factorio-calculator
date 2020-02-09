import {Route, RouteRecord} from "vue-router";

const metadataTagAttribute = 'data-vue-router-controlled';

/**
 * Update page metadata from the route datas
 * @param to
 * @param from
 * @param next
 */
export function updateMetaTagsFromRoute(to: Route, from: Route, next: any) {
    const nearestWithTitle = to.matched.slice().reverse().find((r:RouteRecord) => r.meta && r.meta.title);

    const nearestWithMeta = to.matched.slice().reverse().find((r:RouteRecord) => r.meta && r.meta.metaTags);
    // const previousNearestWithMeta = from.matched.slice().reverse().find((r:RouteRecord) => r.meta && r.meta.metaTags);

    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title + ' | ' + process.env.VUE_APP_TITLE;
    }

    if (!nearestWithMeta) {
        return next();
    }

    updateMetaTags(nearestWithMeta.meta.metaTags);

    next();
}

/**
 * Remove any stale meta tags from the document using the key attribute we set below.
 */
export function removeExistingMetaTags(){
    Array.from(document.querySelectorAll('[' + metadataTagAttribute + ']')).map((el) => {
        if(el.parentNode !== null){
            el.parentNode.removeChild(el)
        }
    });
}

/**
 * Update the meta tags of the current page
 * @param tags
 */
export function updateMetaTags(tags: Array<any>){
    removeExistingMetaTags();

    let balises = tags.map((tagDef: any) => {
        const tag = document.createElement('meta');

        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });

        // We use this to track which meta tags we create, so we don't interfere with other ones.
        tag.setAttribute(metadataTagAttribute, '');

        return tag;
    });

    // Add the meta tags to the document head.
    balises.forEach((tag: any) => document.head.appendChild(tag));
}
