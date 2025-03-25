export const chooseImage = (tags:Array<string>) => {
    if (tags.length == 0){
        return 'src/pages/models_page/assets/temp.jpg'
    }
    if ((tags[0] == 'Machine learning') || (tags[0] == 'Deep learning')){
        return 'src/pages/models_page/assets/tag1.jpg';
    }
    else if ((tags[0] == 'Pattern recognition') || (tags[0] == 'Neuronal networks')){
        return 'src/pages/models_page/assets/tag2.jpg';
    }
    else{
        return 'src/pages/models_page/assets/tag3.jpg';
    }
}