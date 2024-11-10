declare const html2pdf: {
    (): {
        from: (element: HTMLElement) => {
            save: (filename: string) => void;
        };
    };
};