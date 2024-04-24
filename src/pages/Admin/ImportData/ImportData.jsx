const ImportData = () => {
  return (
    <>
      <div class="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <div class="card w-full max-w-md bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Import Data</h2>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Select Excel File</span>
              </label>
              <input
                type="file"
                class="file-input file-input-bordered w-full"
              />
            </div>
            <div class="card-actions justify-end mt-4">
              <button class="btn btn-primary">Import</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportData;
