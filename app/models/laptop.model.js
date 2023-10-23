module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        Manufacturer: String,
        ModelName: String,
        Category: String,
        ScreenSize: String,
        Screen: String,
        CPU: String,
        RAM: String,
        Storage: String,
        GPU: String,
        OperatingSystem: String,
        OperatingSystemVersion: String,
        Weight: String,
        PriceEuros: Number,
        image: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Tutorial = mongoose.model("laptop", schema);
    return Tutorial;
  };