import './styles.css'

export function blockStyles(contentBlock) {
    const type = contentBlock.getType()
    switch (type) {
        case "unstyled":
            return "blux-post-preview__block-unstyled"
        case "paragraph":
            return "blux-post-preview__block-paragraph"
        case "header-one":
            return "blux-post-preview__block-header-one"
    }
}