interface OutputTimeProps {
    name: string;
}

export default function OutputTime(props: OutputTimeProps) {
    const year: string = props.name.substring(8,12);
    const month: string = props.name.substring(12,14);
    const day: string = props.name.substring(14,16);
    const hour: string = props.name.substring(16,18);
    const minutes: string = props.name.substring(18,20);

    return (
        <div>
            <p>{year}/{month}/{day} {hour}:{minutes}</p>
        </div>
    );
}