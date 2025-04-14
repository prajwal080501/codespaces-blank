export default function Emoji({label}: {label?: string}, {symbol}: {symbol: string}) {
    return <span
    className="emoji"
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
>
    {symbol}
</span>
}