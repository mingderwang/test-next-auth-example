import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Pins({ ...props }) {
  console.log("props.user_id", props.user_id);
  const { data, error } = useSWR(`/api/pins/${props.user_id}`, fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  console.log("data", data);
  const pins = data.slice(0, 21); // only show first 20 pins

  function jsony(a) {
    return Object.entries(a)
      .map(([k, v]) => `${k}: ${v}`) // stringfy an json object a
      .join(`,\n `);
  }

  return (
    <>
      <div className="flex flex-wrap">
        {pins.map((pin, i) => (
          <div className="flex flex-nowrap">
            <div className="card w-72 card-bordered card-compact lg:card-normal">
              <figure>
                <img src={`${pin.images["237x"].url}`}></img>
              </figure>
              <div className="card-body">
                <h2 className="card-title">{pin.pinner.full_name}</h2>
                <p>{pin.description}</p>
                <div class="justify-end card-actions">
                  <button class="btn btn-secondary">convert to NFT</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
