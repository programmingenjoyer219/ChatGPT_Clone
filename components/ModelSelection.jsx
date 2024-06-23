"use client"
import useSWR from "swr";
import Select from "react-select";

async function fetchModels() {
    return fetch("/api/getEngines").then(res => res.json());
}

export default function ModelSelection() {
    const { data: models, isLoading } = useSWR("models", fetchModels);
    const { data: model, mutate: setModel } = useSWR("model", { fallbackData: "gpt-3.5-turbo-16k" })

    return (
        <div className="mt-2">
            <Select
                options={models?.modelOptions}
                defaultValue={model}
                placeholder={model}
                className="mt-2"
                isSearchable
                isLoading={isLoading}
                menuPosition="fixed"
                classNames={{
                    control: (state) => "bg-[#434654] border-[#434654] text-white",
                }}
                onChange={(e) => { setModel(e.value) }}
            />

        </div>
    )
}
