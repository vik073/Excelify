

export function countDays(endDate: any) {
    const date1: any = new Date();
    const date2: any = new Date(endDate);
    const diffTime = (date2 - date1);
    
    if(diffTime < 0)
        return 0;

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}