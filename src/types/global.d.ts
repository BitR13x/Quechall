/// <reference types="react-scripts" />


export interface alertObj {
    message: string
}

interface passwordsObj {
    id: string,
    name: string,
    content: string,
    OwnerId: number,
    createdAt: string
}

interface notesObj {
    id: string,
    name: string,
    content: string,
    OwnerId: number,
    createdAt: string
}

// interface StoreFetchContextTypes { 
//     VaultStorage: [passwordsObj[], notesObj[]],
//     setVaultStorage: any
// }