export function lexicalSort(a, b, key) {
    return a[key] < b[key] ? -1 : 1;
};


export function getDrawerWidth(screens) {
    if (!screens.md) return '100%'
    else return '640px';
  }
  

export const formLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 }
}
export const formTailLayout = {
    wrapperCol: { offset: 5, span: 10 }
}
