export interface Category {
    id: number, 
    categories_name: string, 
    visible: boolean,
}

export interface Dataset {
    user: any;
    id: number;
    dataset_name: string;
    autor?: string;
    score: string;
    accuracy: number;
    publish_date: string;
    description?: string;
    url_source: string;
    url_paper: string;
    version: Array<string>;
    status: string;
    cont_views: number;
    category: Category[]
}

export interface DatasetDetails {
    id_user?: number,
    dataset_name: string;
    description: string;
    url_source: string;
    url_papers: string[];
    privated?: boolean;
    version?: string;
    categories: Category[];
}

// Check URL format
export const isValidUrl = (url: string) => {
    const urlPattern = /^(ftp|http|https):\/\/[^\s]+|^(www\.[^\s]+\.[^\s]{2,})(:\d{2,5})?$/;
    return urlPattern.test(url);
};

// Check if URLs are valid
export const validateUrls = (urls: string[]) => {
    const invalidUrls: string[] = [];
    const urlSet = new Set<string>();
    let hasDuplicates = false;

    for (const url of urls) {
        if (!isValidUrl(url)) {
        invalidUrls.push(url);
        }
        if (urlSet.has(url)) {
        hasDuplicates = true;
        } else {
        urlSet.add(url);
        }
    }

    return { invalidUrls, hasDuplicates };
};

// Check if version format is valid
export const isValidVersion = (value: string) => {
    const regex = /^\d+(\.\d+){1,2}$/;
    return regex.test(value);
};