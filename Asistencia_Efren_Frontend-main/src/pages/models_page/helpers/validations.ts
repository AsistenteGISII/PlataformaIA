export interface Category {
    id: number, 
    categories_name: string, 
    visible: boolean,
}

export interface Model {
    user: any;
    id: number;
    model_name: string;
    autor?: string;
    score: number;
    accuracy: number;
    status: string;
    cont_views: number;
    publish_date: string;
    small_description: string;
    category: Category[];
}

export interface ModelDetails {
    user_id?: number,
    model_name: string;
    small_description: string;
    large_description: string;
    accuracy: number;
    url_colab: string;
    url_datasets: string[];
    url_papers: string[];
    categories: Category[];
    version?: string;
    privated?: boolean;
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

// Check if URL is a Colab URL
export const validateColabUrl = (url: string) => {
    const colabUrlPattern = /^https:\/\/colab\.research\.google\.com\/.+/;
    return colabUrlPattern.test(url);
};

// Check if version format is valid
export const isValidVersion = (value: string) => {
    const regex = /^\d+(\.\d+){1,2}$/;
    return regex.test(value);
};