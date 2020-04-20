import {authModule} from "../../_Common/Store"

function compareRole(allowed: string[]) {
    if (authModule && authModule.role) {
        return authModule.role.filter((value: string) => allowed.includes(value))
    }
    return []
}

export default function isAllowed(allowed: string[]): boolean {
    return compareRole(allowed).length > 0
}
