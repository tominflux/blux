import './styles.css'

export function blockStyles(contentBlock) {
    const type = contentBlock.getType()
    switch (type) {
        case "unstyled":
            return "blux-text-block__block-unstyled"
        case "paragraph":
            return "blux-text-block__block-paragraph"
        case "header-one":
            return "blux-text-block__block-header-one"
    }
}