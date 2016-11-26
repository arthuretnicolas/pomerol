defmodule Pomerol.PreloadBehaviour do
  @callback preload_all(Ecto.Queryable.t) :: Ecto.Query.t
  @callback preload_all(Ecto.Queryable.t, String.t) :: Ecto.Query.t
end

defmodule Pomerol.PreloadConcern do
  defmacro __using__(_opts) do
    quote location: :keep do
      alias Pomerol.Gettext
      @behaviour Pomerol.PreloadBehaviour

      def preload_all(query), do: preload_all(query, Gettext.config[:default_locale])
      def preload_all(query, _locale), do: query

      defoverridable [preload_all: 1, preload_all: 2]
    end
  end
end
